package com.exemplo.usuariosimples.domain.usuario.service;

import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;
import org.springframework.stereotype.Service;

@Service
public class UpgradePlanoService {

    private static final int CURSOS_PARA_PREMIUM = 12;

    public boolean verificarEAplicarUpgrade(Aluno aluno) {
        if (aluno.isPremium()) {
            return false;
        }
        if (aluno.getTotalCursosConcluidos() >= CURSOS_PARA_PREMIUM) {
            aluno.fazerUpgradePremium();
            return true;
        }
        return false;
    }
}
