import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  ReceiptText,
  Sparkles,
  TrendingUp,
  Upload,
} from 'lucide-react'

const extractedItems = [
  { label: '아이스 아메리카노', amount: '4,500원' },
  { label: '샌드위치', amount: '6,800원' },
  { label: '프로젝트 회의실', amount: '18,000원' },
]

const metrics = [
  { label: '수기 입력 시간', value: '80%', caption: '감소 목표' },
  { label: '누락 영수증', value: '한곳에', caption: '모아 관리' },
  { label: '정산 흐름', value: '입력 -> 승인', caption: '업무 전환' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#171717]">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-8 px-5 py-8 md:grid-cols-[0.92fr_1.08fr] md:px-8 md:py-10">
        <div className="flex flex-col justify-between gap-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#171717] text-white">
                <ReceiptText size={22} />
              </div>
              <span className="text-xl font-bold">Daon</span>
            </div>
            <span className="rounded-full border border-[#d7d3c4] px-3 py-1 text-sm text-[#5f5b4e]">
              AI receipt ops
            </span>
          </div>

          <div className="max-w-2xl space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e7f0d4] px-3 py-1 text-sm font-semibold text-[#35450f]">
              <Sparkles size={16} />
              사진 한 장을 정산 가능한 데이터로
            </div>
            <div className="space-y-5">
              <h1 className="text-5xl font-black leading-[1.02] md:text-7xl">
                영수증 정리,
                <br />
                이제 입력이 아니라 확인입니다.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-[#5b5b54]">
                Daon은 흩어진 영수증과 결제 캡처를 AI가 먼저 읽고, 날짜와 상호,
                금액, 품목을 정산 가능한 비용 데이터로 바꿉니다.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-[#ded9c9] bg-white/70 p-4">
                  <p className="text-sm text-[#6f6b60]">{metric.label}</p>
                  <p className="mt-2 text-2xl font-black">{metric.value}</p>
                  <p className="text-sm text-[#6f6b60]">{metric.caption}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 text-sm text-[#4c4a43] sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Clock3 size={18} />
              정산 시간 절감
            </div>
            <div className="flex items-center gap-2">
              <FileText size={18} />
              증빙 누락 감소
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={18} />
              팀/소상공인 확장
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-2xl border border-[#d7d3c4] bg-white p-4 shadow-[0_24px_80px_rgba(40,39,32,0.14)] md:p-6">
            <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="rounded-xl bg-[#22221f] p-5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">영수증 업로드</span>
                  <Upload size={18} />
                </div>
                <div className="mt-8 rounded-lg bg-[#f8f3e7] p-5 text-[#26231d]">
                  <div className="text-center text-sm font-bold">DAON CAFE</div>
                  <div className="mt-5 space-y-3 text-sm">
                    {extractedItems.map((item) => (
                      <div key={item.label} className="flex justify-between border-b border-dashed border-[#c9c1ae] pb-2">
                        <span>{item.label}</span>
                        <span>{item.amount}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex justify-between text-lg font-black">
                    <span>TOTAL</span>
                    <span>29,300원</span>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-white/70">
                  종이 영수증, 카드 결제 캡처, 메신저에 올라온 사진까지 한 흐름으로 정리합니다.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-[#e5e1d4] bg-[#fbfaf6] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#6d672c]">AI 추출 완료</p>
                      <h2 className="mt-1 text-2xl font-black">정산 데이터 초안</h2>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#dff36c]">
                      <CheckCircle2 size={25} />
                    </div>
                  </div>
                  <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-white p-3">
                      <dt className="text-[#7a7669]">날짜</dt>
                      <dd className="mt-1 font-bold">2026.05.17</dd>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                      <dt className="text-[#7a7669]">상호</dt>
                      <dd className="mt-1 font-bold">DAON CAFE</dd>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                      <dt className="text-[#7a7669]">카테고리</dt>
                      <dd className="mt-1 font-bold">팀 회의비</dd>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                      <dt className="text-[#7a7669]">총액</dt>
                      <dd className="mt-1 font-bold">29,300원</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-xl border border-[#e5e1d4] bg-white p-5">
                  <p className="text-sm font-semibold text-[#7a7669]">데모 메시지</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="rounded-lg bg-[#171717] px-3 py-2 text-sm font-bold text-white">
                      사람이 입력
                    </span>
                    <ArrowRight className="shrink-0" size={20} />
                    <span className="rounded-lg bg-[#dff36c] px-3 py-2 text-sm font-bold text-[#22221f]">
                      AI가 준비, 사람이 승인
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#5f5b4e]">
                    발표에서는 OCR 정확도보다 이 전환 효과를 보여주는 것이 핵심입니다.
                    영수증 이미지는 보관물이 아니라 바로 활용 가능한 비용 데이터가 됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
