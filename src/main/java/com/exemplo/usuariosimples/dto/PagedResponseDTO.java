package com.exemplo.usuariosimples.dto;

import java.util.List;

public class PagedResponseDTO<T> {
    private List<T> content;
    private long totalElements;
    private int totalPages;
    private int pagina;
    private int tamanhoPagina;

    public PagedResponseDTO() {}

    public PagedResponseDTO(List<T> content, long totalElements, int totalPages, int pagina, int tamanhoPagina) {
        this.content = content;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.pagina = pagina;
        this.tamanhoPagina = tamanhoPagina;
    }

    public static <T> PagedResponseDTO<T> of(List<T> content) {
        return new PagedResponseDTO<>(content, content.size(), 1, 0, content.size());
    }

    public List<T> getContent() { return content; }
    public long getTotalElements() { return totalElements; }
    public int getTotalPages() { return totalPages; }
    public int getPagina() { return pagina; }
    public int getTamanhoPagina() { return tamanhoPagina; }
}
