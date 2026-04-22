import { s3, sql, write } from "bun";

/**
 * Bun + Supabase Native Integration
 */

// .env 체크
if (process.env.POSTGRES_URL?.includes("[PASSWORD]")) {
  console.error("❌ 오류: .env 파일에서 [PASSWORD] 부분을 실제 데이터베이스 비밀번호로 바꿔주세요!");
  process.exit(1);
}

try {
  console.log("🚀 실행 중...");

  // 1. S3 파일 업로드 (demo.png -> S3)
  console.log("📤 S3에 파일 업로드 중...");
  const file = Bun.file("demo.png");
  if (!(await file.exists())) {
    throw new Error("demo.png 파일이 없습니다. 먼저 이미지를 생성해주세요.");
  }
  
  // s3.file("경로")를 사용해 업로드 대상을 지정하고 write()로 씁니다.
  await write(s3.file("demo.png"), file);
  console.log("✅ 업로드 완료!");

  // 2. SQL 쿼리 실행
  console.log("🔍 데이터베이스 조회 중...");
  const files = await sql`
    SELECT name, created_at, metadata
    FROM storage.objects
    ORDER BY created_at DESC
    LIMIT 1
  `;

  if (files.length > 0) {
    console.log("✅ 조회 성공! 최근 업로드된 파일:");
    console.log(files[0]);
  } else {
    console.log("ℹ️ storage.objects 테이블에 데이터가 없습니다.");
  }

} catch (error) {
  console.error("❌ 실행 중 오류 발생:");
  console.error(error.message);
} finally {
  // SQL 연결 종료 (스크립트 종료를 위해 필요할 수 있음)
  // Bun.sql은 자동으로 관리되기도 하지만 명시적으로 종료할 수도 있습니다.
}