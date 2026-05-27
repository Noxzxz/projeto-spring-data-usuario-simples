package com.exemplo.usuariosimples.application.usuario;

import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;
import com.exemplo.usuariosimples.domain.usuario.entity.Pessoa;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import com.exemplo.usuariosimples.domain.usuario.valueobject.NomeCompleto;
import com.exemplo.usuariosimples.domain.usuario.valueobject.SenhaCriptografada;
import com.exemplo.usuariosimples.infrastructure.persistence.jpa.PessoaJpaRepository;
import com.exemplo.usuariosimples.infrastructure.security.JwtTokenProvider;
import com.exemplo.usuariosimples.infrastructure.security.UserDetailsImpl;
import com.exemplo.usuariosimples.interfaces.rest.usuario.dto.LoginResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthUseCase {

    private static final long TOKEN_EXPIRATION = 86400000L;
    private static final Logger log = LoggerFactory.getLogger(AuthUseCase.class);

    private final PessoaJpaRepository pessoaRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthUseCase(PessoaJpaRepository pessoaRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.pessoaRepository = pessoaRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public void register(String nomeCompleto, String emailStr, String senha) {
        Email email = new Email(emailStr);
        NomeCompleto nome = new NomeCompleto(nomeCompleto);

        if (pessoaRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }

        String senhaHash = passwordEncoder.encode(senha);
        SenhaCriptografada senhaCripto = new SenhaCriptografada(senhaHash);

        Aluno aluno = new Aluno(nome, email, senhaCripto);
        pessoaRepository.save(aluno);
    }

    @Transactional(readOnly = true)
    public LoginResponseDTO login(String emailStr, String senha) {
        Email email = new Email(emailStr);

        Pessoa pessoa = pessoaRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("E-mail ou senha inválidos"));

        if (!passwordEncoder.matches(senha, pessoa.getSenha().hash())) {
            throw new IllegalArgumentException("E-mail ou senha inválidos");
        }

        UserDetailsImpl userDetails = new UserDetailsImpl(pessoa);
        String token = jwtTokenProvider.generateToken(userDetails);
        log.debug("Token gerado para {} - email: {}, perfil: {}, id: {}",
                pessoa.getNome().valor(), pessoa.getEmail().endereco(),
                pessoa.getPerfil().name(), pessoa.getId());

        String perfilFront = switch (pessoa.getPerfil()) {
            case PROFESSOR -> "PROFESSOR";
            case ADMINISTRADOR -> "ADMINISTRADOR";
            default -> pessoa.getPerfil().name();
        };

        return new LoginResponseDTO(
                token,
                "Bearer",
                TOKEN_EXPIRATION,
                new LoginResponseDTO.UsuarioInfo(
                        pessoa.getId().toString(),
                        pessoa.getNome().valor(),
                        pessoa.getEmail().endereco(),
                        perfilFront
                )
        );
    }
}
