package com.typeface.dropface.file;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FileResponse {
    private Long id;
    private String name;
    private String contentType;
    private long size;
    private LocalDateTime uploadedAt;
}