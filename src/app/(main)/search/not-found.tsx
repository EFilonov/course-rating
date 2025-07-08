'use client';

import Button from "@/app/components/Button/Button";
import { ErrorInterface } from "@/app/interfaces/Error.interface";

export default function Error({ error }: ErrorInterface, reset: () => void): React.JSX.Element {
  const errorInstance = new globalThis.Error(error?.message || 'An error occurred');
  const onGoToMain = () => {
    window.location.href = '/';
  };
  const onGoToPrevious = () => {
    window.history.back();
  };

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '75vh',
      paddingBottom: '28px',
      gridArea: 'main', // важно для сетки!
    }}>
        
      <h3 style={{
        marginTop: '28px',
        fontSize: 'clamp(16px, 3vw, 12px)',
        fontWeight: 200
      }}>{errorInstance.message}</h3>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: '20px',
        gap: '24px'
      }}>
        <Button onClick={onGoToMain} appearance='blue'>На главную</Button>
        <Button onClick={onGoToPrevious} appearance='blue'>На предыдущую</Button>
      </div>
      <img
        src="/images/error_bg.png"
        alt="Error Background"
        style={{
          width: '100%',
          objectFit: 'cover'
        }}
      />
      
    </main>
  );
}