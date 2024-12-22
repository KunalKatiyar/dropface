# Dropface

This project implements a simplified version of a Dropbox-like platform for a typeface project where users can upload, view, and download files. The system is divided into two main parts: the **frontend** and the **backend**.

## Project Structure

```
├── frontend/   # Next.js application for the user interface
├── backend/    # Spring Boot application for the RESTful APIs
```

## Features

### Backend
- **Authentication**: User authentication and authorization using JWT.
- **File Management**: 
  - Upload files with support for various formats (e.g., `.txt`, `.jpg`, `.png`, `.json`).
  - Retrieve a list of all user-uploaded files.
  - Download specific files.
- **Storage**: 
  - File storage on the local filesystem.
  - Metadata and user data stored in a MySQL database (Dockerized).

### Frontend
- **File Listing**: A homepage displaying all user-uploaded files.
- **File Upload**: Upload files directly through the UI, with restrictions on supported file types.
- **File Viewing**: View file content (for supported formats) on a dedicated page.

---

## Technologies Used

### Backend
- **Framework**: Spring Boot
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: MySQL (Dockerized)
- **Storage**: Local filesystem

### Frontend
- **Framework**: Next.js
- **Styling**: Lucide

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- Docker
- Node.js and npm (Node 18.18+)
- Java 21 and Maven

## Demo purpose

### Please refer to `demo.mp4` for a sample demo or you can run the file `./run.sh` for running. It contains built files and jars for easier running and automates the build tasks.
### If any issues are faced, you can try running individual services

## Individual running

### Backend Setup
1. Navigate to the `backend/` folder.
2. Build the Spring Boot application:
   ```bash
   mvn clean install
   ```
3. Start the MySQL container:
   ```bash
   docker-compose up -d
   ```
4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the `frontend/` folder.
2. Create `.env` file with following properties
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=VVg9qYMZaq0cf7yGwvOfA1mRVj6gAqwwIUCBqyYtykI= (a random string)
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Next.js application:
   ```bash
   npm run dev
   ```
5. Access the application in your browser at `http://localhost:3000`.

---

## Future Enhancements
- **Cloud Storage**: Option to store files on AWS S3 or Azure Blob Storage.
- **UI Improvements**: Enhanced user interface with additional features like file previews and drag-and-drop uploads.

---

## Further design improvments
- **Chunk uploads**: File uploads can be done in chunks and processed parallely for low latency and high availability
- **Progress and Resumability**: For huge uploads, we can have progress meters and allow resume feature to keep uploading
- **Local/Multi-device sync**: File download and keeping sync with local versions, while maintaining consistency
---

## License
This project is licensed under the MIT License.
