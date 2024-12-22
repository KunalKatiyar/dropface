package com.typeface.dropface.controller;
import com.typeface.dropface.file.FileResponse;
import com.typeface.dropface.model.User;
import com.typeface.dropface.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
/**
 * FileController
 * Responsible for managing file upload, download, and deletion
 */
@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<FileResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(fileService.uploadFile(file, user));
    }

    @GetMapping
    public ResponseEntity<List<FileResponse>> getUserFiles(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(fileService.getUserFiles(user));
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long fileId,
            @AuthenticationPrincipal User user
    ) {
        Resource resource = fileService.downloadFile(fileId, user);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<?> deleteFile(
            @PathVariable Long fileId,
            @AuthenticationPrincipal User user
    ) {
        fileService.deleteFile(fileId, user);
        return ResponseEntity.ok().build();
    }
}