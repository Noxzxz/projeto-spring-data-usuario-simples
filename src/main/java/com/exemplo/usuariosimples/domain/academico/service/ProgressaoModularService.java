package com.exemplo.usuariosimples.domain.academico.service;

import com.exemplo.usuariosimples.domain.academico.entity.Matricula;
import org.springframework.stereotype.Service;

@Service
public class ProgressaoModularService {

    public boolean podeAvancarModulo(Matricula matricula, int ordemModuloAlvo) {
        if (!matricula.podeAvancarModulo()) {
            return false;
        }
        int proximoModulo = matricula.getModulosConcluidos() + 1;
        return ordemModuloAlvo == proximoModulo;
    }

    public void registrarConclusaoModulo(Matricula matricula, int ordemModulo) {
        if (!podeAvancarModulo(matricula, ordemModulo)) {
            int esperado = matricula.getModulosConcluidos() + 1;
            throw new IllegalStateException(
                    "Nao e possivel concluir o modulo " + ordemModulo
                            + ". Complete o modulo " + esperado + " primeiro.");
        }
        matricula.registrarModuloConcluido();
    }
}
