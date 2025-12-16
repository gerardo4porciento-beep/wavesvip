
export const WavesBranding = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full px-4 md:px-8 pointer-events-none z-0">
            <h1
                className="text-white/10 font-bold leading-none select-none text-center w-full m-0 p-0"
                style={{
                    fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
                    fontSize: 'clamp(4rem, 18vw, 12rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.08em',
                    fontStretch: 'condensed',
                    width: '100%',
                    transform: 'scaleX(1.15) translateY(25%)', // Push down slightly to look like footer
                    transformOrigin: 'bottom center',
                    whiteSpace: 'nowrap',
                    display: 'block',
                    marginBottom: '0',
                    paddingBottom: '0'
                }}
            >
                WAVES
            </h1>
        </div>
    );
};
