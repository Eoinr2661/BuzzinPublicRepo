import React, { useState, useEffect, useRef } from 'react';

const MailingListSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Animation
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimate(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => setAnimate(true);
  const handleMouseLeave = () => setAnimate(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api/TEST/subscribe', { //TODO update to proper endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Subscription failed');
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full p-12 py-20 md:p-28 md:py-32 bg-gradient-to-r from-buzzin-purple-500 to-buzzin-purple-400 overflow-hidden">

      <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-center md:text-left text-white font-TAN-HEADLINE-Regular relative">
        Want Dublin events <br />
        sent straight to your{' '}
        <span className="relative inline-block">

          <svg
            className="absolute -top-19 -left-10 md:-top-26 md:-left-12 w-55 h-55 md:w-80 md:h-80 text-yellow-400 stroke-yellow-400 opacity-60 pointer-events-none"
            viewBox="-5 -20 60 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 0C2-17 44-11 43 1 43 8 9 15 2 1 3-16 45-8 42 0 40 15 11 13 2 3-5-14 42-7 43-2 46 5 6 19 1 0"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="300"
              strokeDashoffset={animate ? 0 : 300}
              style={{ transition: 'stroke-dashoffset 3s ease' }}
            />
          </svg>
          <svg
            className="hidden lg:block absolute top-10 -right-50 w-90 h-90 text-yellow-500 stroke-yellow-500 opacity-80 pointer-events-none rotate-[-30deg]"
            viewBox="0 0 50 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 0 L 24 26 L 10 24 L 31 46 L 29 46 L 31 46 L 31 44"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="300"
              strokeDashoffset={animate ? 0 : 300}
              style={{
                transition: 'stroke-dashoffset 5s ease-out',
              }}
            />
          </svg>

          <span className="relative">inbox?</span>
        </span>
      </h2>

      {isSuccess && (
        <div className="mb-4 p-3 bg-green-600 text-white rounded">
          Thank you for subscribing!
        </div>
      )}

      <div className="flex flex-col md:flex-row-reverse">
        <div className='md:mt-20'>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center max-w-xl gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="We saved a spot for your email"
              className="flex-1 text-white text-center md:text-start w-full placeholder-gray-300 focus:outline-none py-2 font-Montserrat-VariableFont border-b border-white"
              disabled={isSubmitting}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative font-medium tracking-wide text-white font-Montserrat-VariableFont ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
                } transition`}
            >
              SEND

            </button>
          </form>

          {error && (
            <p className="mt-2 text-red-400 text-sm">{error}</p>
          )}

          <p className="mt-20 text-gray-600 text-sm max-w-xl text-left font-sans">
            By clicking send, you'll receive occasional emails from AreYouBuzzin. You always have the choice to unsubscribe within every email you receive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MailingListSignup;
