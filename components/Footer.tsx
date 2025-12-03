export default function Footer() {
  return (
    <footer className="bg-luxury-gold w-full pt-2 md:pt-4 pb-16 md:pb-20 relative overflow-x-visible">
      {/* Letras grandes WAVES que ocupan todo el ancho */}
      <div className="w-full px-4 md:px-8">
        <h1 
          className="text-luxury-dark font-black leading-none select-none text-center w-full"
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
            overflow: 'visible',
            display: 'block'
          }}
        >
          WAVES
        </h1>
      </div>
    </footer>
  );
}

