package com.typeface.dropface.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "files")
public class FileEntity {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    private String path;
    private String contentType;
    private long size;
    private LocalDateTime uploadedAt;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}