export default function Footer() {
  return (
    <footer className="bg-luxury-gold w-full pt-2 md:pt-4 relative overflow-hidden" style={{ paddingBottom: '0', marginBottom: '0' }}>
      {/* Letras grandes WAVES que ocupan todo el ancho */}
      <div className="w-full px-4 md:px-8" style={{ paddingBottom: '0', marginBottom: '0', overflow: 'hidden', clipPath: 'inset(0 0 10% 0)' }}>
        <h1 
          className="text-luxury-dark font-black leading-none select-none text-center w-full m-0 p-0"
          style={{ 
            fontFamily: '"Helvetica Neue", "Helvetica", "Arial Black", "Arial", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(10rem, 28vw, 28rem)',
            letterSpacing: '-0.08em',
            fontStretch: 'condensed',
            width: '100%',
            transform: 'scaleX(1.15)',
            transformOrigin: 'center',
            whiteSpace: 'nowrap',
            display: 'block',
            lineHeight: '0.75',
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

