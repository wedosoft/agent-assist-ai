/**
 * Freshdesk FDK 서버사이드 코드
 * 보안이 필요한 API 호출이나 서버 로직을 여기에 구현합니다
 */

/**
 * 티켓 업데이트 이벤트 핸들러
 */
exports.onTicketUpdateHandler = function(args) {
  console.log('티켓이 업데이트되었습니다:', args);

  // 필요한 경우 여기서 추가 로직 처리
  // 예: 티켓 상태 변경 시 AI 분석 트리거

  renderData();
};

/**
 * AI 분석 API 호출 (예시)
 * 클라이언트에서 Request API를 통해 호출할 수 있습니다
 */
exports.analyzeTicket = function(args) {
  const { ticketId, ticketData } = JSON.parse(args.iparams);

  return new Promise((resolve, reject) => {
    // 여기서 외부 AI API 호출
    // $request를 사용하여 HTTP 요청

    // 예시 응답
    resolve({
      status: 200,
      response: JSON.stringify({
        summary: ['분석 요약 1', '분석 요약 2'],
        cause: '원인 분석',
        actions: ['권장 조치 1', '권장 조치 2']
      })
    });
  });
};
