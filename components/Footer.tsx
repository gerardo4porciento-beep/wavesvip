export default function Footer() {
  return (
    <footer className="bg-luxury-gold w-full relative overflow-hidden" style={{ height: '40vh', minHeight: '300px' }}>
      {/* Letras grandes WAVES que ocupan todo el ancho y se cortan por arriba y abajo */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <h1 
          className="text-white font-black leading-none select-none text-center w-full m-0 p-0"
          style={{ 
            fontFamily: '"Helvetica Neue", "Helvetica", "Arial Black", "Arial", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(15rem, 40vw, 45rem)',
            letterSpacing: '-0.08em',
            fontStretch: 'condensed',
            width: '100%',
            transform: 'translateY(-50%) scaleX(1.15)',
            transformOrigin: 'center',
            whiteSpace: 'nowrap',
            display: 'block',
            lineHeight: '1',
            margin: '0',
            padding: '0',
            position: 'relative',
            top: '50%'
          }}
        >
          WAVES
        </h1>
      </div>
    </footer>
  );
}

