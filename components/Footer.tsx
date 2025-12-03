export default function Footer() {
  return (
    <footer className="bg-luxury-gold w-full pt-2 md:pt-4 relative overflow-x-visible" style={{ paddingBottom: '0', marginBottom: '-30px', height: 'fit-content' }}>
      {/* Letras grandes WAVES que ocupan todo el ancho */}
      <div className="w-full px-4 md:px-8" style={{ paddingBottom: '0', marginBottom: '0' }}>
        <h1 
          className="text-white font-semibold leading-none select-none text-center w-full m-0 p-0"
          style={{ 
            fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(10rem, 28vw, 28rem)',
            letterSpacing: '-0.08em',
            fontStretch: 'condensed',
            width: '100%',
            transform: 'scaleX(1.15)',
            transformOrigin: 'center',
            whiteSpace: 'nowrap',
            overflow: 'visible',
            display: 'block',
            lineHeight: '0.85',
            margin: '0',
            marginBottom: '0',
            padding: '0',
            paddingBottom: '0'
          }}
        >
          WAVES
        </h1>
      </div>
    </footer>
  );
}

