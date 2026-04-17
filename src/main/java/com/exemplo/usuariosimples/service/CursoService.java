package com.exemplo.usuariosimples.service;

import com.exemplo.usuariosimples.domain.Curso;
import com.exemplo.usuariosimples.repository.CursoRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CursoService {

    private CursoRepository repository;

    public CursoService(CursoRepository repository) {}

}
