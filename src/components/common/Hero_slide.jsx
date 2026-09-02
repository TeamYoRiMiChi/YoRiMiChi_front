import '../../assets/styles/common/Hero_slide.css';
import { useEffect, useState } from 'react';

function Hero_slide({ slides = [], interval = 5000 }) {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;

        const timer = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % slides.length);
        }, interval);

        return () => window.clearInterval(timer);
    }, [slides.length, interval]);

    const moveSlide = (direction) => {
        setActiveSlide((current) =>
            (current + direction + slides.length) % slides.length
        );
    };

    if (slides.length === 0) return null;

    return (
        <>
            {/* =========================
          HERO
      ========================= */}
            <section className="hero_box" aria-label="共同購入のお知らせ" lang="ja">
                <div className="hero_slider">
                    {slides.map((slide, index) => (
                        <article
                            className={`hero_slide ${slide.layout ?? ''} ${activeSlide === index ? 'active' : ''}`}
                            aria-hidden={activeSlide !== index}
                            key={slide.alt}
                        >
                            <img
                                className="hero_image"
                                src={slide.image}
                                alt={slide.alt}
                            />

                            {slide.title && (
                                <div className={`hero_copy ${slide.tone}`}>
                                    <span>{slide.eyebrow}</span>
                                    <h2>{slide.title}</h2>
                                    <p>{slide.description}</p>
                                </div>
                            )}
                        </article>
                    ))}

                    <button
                        type="button"
                        className="hero_arrow prev"
                        onClick={() => moveSlide(-1)}
                        aria-label="前のスライド"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className="hero_arrow next"
                        onClick={() => moveSlide(1)}
                        aria-label="次のスライド"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>

                    <div className="hero_dots">
                        {slides.map((slide, index) => (
                            <button
                                type="button"
                                className={activeSlide === index ? 'active' : ''}
                                onClick={() => setActiveSlide(index)}
                                aria-label={`${index + 1}番目のスライドを表示`}
                                aria-current={activeSlide === index ? 'true' : undefined}
                                key={slide.alt}
                            />
                        ))}
                    </div>
                </div>
            </section>






        </>
    );
}
export default Hero_slide;