package com.exemplo.usuariosimples.dto;

import java.time.Instant;

public class ApiResponseDTO<T> {
    private T data;
    private String mensagem;
    private String timestamp;

    public ApiResponseDTO() {}

    public ApiResponseDTO(T data, String mensagem) {
        this.data = data;
        this.mensagem = mensagem;
        this.timestamp = Instant.now().toString();
    }

    public static <T> ApiResponseDTO<T> ok(T data) {
        return new ApiResponseDTO<>(data, "ok");
    }

    public T getData() { return data; }
    public String getMensagem() { return mensagem; }
    public String getTimestamp() { return timestamp; }
}
