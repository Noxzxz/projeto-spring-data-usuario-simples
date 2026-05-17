package com.exemplo.usuariosimples.application.usuario;

import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;
import com.exemplo.usuariosimples.domain.usuario.repository.AlunoRepository;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import com.exemplo.usuariosimples.domain.usuario.valueobject.NomeCompleto;
import com.exemplo.usuariosimples.domain.usuario.valueobject.SenhaCriptografada;
import com.exemplo.usuariosimples.infrastructure.security.JwtTokenProvider;
import com.exemplo.usuariosimples.infrastructure.security.UserDetailsImpl;
import com.exemplo.usuariosimples.interfaces.rest.usuario.dto.LoginResponseDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthUseCase {

    private static final long TOKEN_EXPIRATION = 86400000L;

    private final AlunoRepository alunoRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthUseCase(AlunoRepository alunoRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.alunoRepository = alunoRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public void register(String nomeCompleto, String emailStr, String senha) {
        Email email = new Email(emailStr);
        NomeCompleto nome = new NomeCompleto(nomeCompleto);

        if (alunoRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }

        String senhaHash = passwordEncoder.encode(senha);
        SenhaCriptografada senhaCripto = new SenhaCriptografada(senhaHash);

        Aluno aluno = new Aluno(nome, email, senhaCripto);
        alunoRepository.save(aluno);
    }

    @Transactional(readOnly = true)
    public LoginResponseDTO login(String emailStr, String senha) {
        Email email = new Email(emailStr);

        Aluno aluno = alunoRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("E-mail ou senha inválidos"));

        if (!passwordEncoder.matches(senha, aluno.getSenha().hash())) {
            throw new IllegalArgumentException("E-mail ou senha inválidos");
        }

        UserDetailsImpl userDetails = new UserDetailsImpl(aluno);
        String token = jwtTokenProvider.generateToken(userDetails);

        return new LoginResponseDTO(
                token,
                "Bearer",
                TOKEN_EXPIRATION,
                new LoginResponseDTO.UsuarioInfo(
                        aluno.getId().toString(),
                        aluno.getNome().valor(),
                        aluno.getEmail().endereco(),
                        aluno.getPerfil().name()
                )
        );
    }
}
