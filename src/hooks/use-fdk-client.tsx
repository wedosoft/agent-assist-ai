import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { FreshdeskClient } from '@/types/fdk';

interface FDKContextType {
  client: FreshdeskClient | null;
  isReady: boolean;
  ticketId: number | null;
  ticketData: any | null;
  error: Error | null;
}

const FDKContext = createContext<FDKContextType>({
  client: null,
  isReady: false,
  ticketId: null,
  ticketData: null,
  error: null,
});

interface FDKProviderProps {
  children: ReactNode;
}

export function FDKProvider({ children }: FDKProviderProps) {
  const [client, setClient] = useState<FreshdeskClient | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [ticketId, setTicketId] = useState<number | null>(null);
  const [ticketData, setTicketData] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initializeFDK() {
      try {
        // FDK 클라이언트가 window 객체에 주입되었는지 확인
        if (typeof window !== 'undefined' && window.app) {
          // FDK 클라이언트 초기화
          const fdkClient = await window.app.initialized();
          setClient(fdkClient);

          // 티켓 컨텍스트 가져오기
          try {
            const context = await fdkClient.instance.context();
            if (context.ticket) {
              setTicketId(context.ticket.id);
              setTicketData(context.ticket);
            }
          } catch (err) {
            console.warn('티켓 컨텍스트를 가져올 수 없습니다:', err);
          }

          setIsReady(true);
        } else {
          // FDK 환경이 아닌 경우 (개발 모드)
          console.warn('FDK 클라이언트를 사용할 수 없습니다. 개발 모드로 실행 중입니다.');
          setIsReady(true);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('FDK 초기화 실패');
        setError(error);
        console.error('FDK 초기화 오류:', error);
        setIsReady(true); // 오류가 있어도 앱은 계속 실행
      }
    }

    initializeFDK();
  }, []);

  return (
    <FDKContext.Provider value={{ client, isReady, ticketId, ticketData, error }}>
      {children}
    </FDKContext.Provider>
  );
}

/**
 * FDK 클라이언트와 티켓 정보에 접근하기 위한 Hook
 */
export function useFDKClient() {
  const context = useContext(FDKContext);
  if (context === undefined) {
    throw new Error('useFDKClient는 FDKProvider 내부에서 사용해야 합니다');
  }
  return context;
}

/**
 * 티켓 데이터를 가져오는 Hook
 */
export function useTicketData() {
  const { ticketId, ticketData, client, isReady } = useFDKClient();
  const [data, setData] = useState(ticketData);
  const [loading, setLoading] = useState(false);

  const refreshTicketData = async () => {
    if (!client || !ticketId) return;

    setLoading(true);
    try {
      const context = await client.instance.context();
      if (context.ticket) {
        setData(context.ticket);
      }
    } catch (error) {
      console.error('티켓 데이터 새로고침 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return { ticketId, ticketData: data, loading, refreshTicketData, isReady };
}
