'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

interface GoogleTranslateProps {
  variant?: 'default' | 'minimal';
}

export default function GoogleTranslate({ variant = 'default' }: GoogleTranslateProps) {
  useEffect(() => {
    // Check if script is already loaded
    if (document.getElementById('google-translate-script')) {
      return;
    }

    // Add Google Translate script
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,es,fr,de,it,pt,ru,ja,ko,zh-CN,zh-TW,ar,hi,bn,pa,te,mr,ta,ur,gu,kn,ml,or,as,mai,sa,ne,si,my,km,lo,th,vi,id,ms,tl,jv,su,ceb,mg,ny,sn,st,zu,xh,yo,ig,ha,sw,rw,om,am,ti,so,af,sq,eu,be,bs,bg,ca,hr,cs,da,nl,et,fi,gl,ka,el,ht,he,hu,is,ga,lv,lt,lb,mk,mt,no,pl,ro,sr,sk,sl,es,sv,tr,uk,cy,yi,az,ky,uz,tg,tk,mn,ug,kk,hy,ka,ps,ku,fa,sd,la,eo,hmn,co,fy,gd,haw,iw,jw,sm,mi,st,su,tg',
            layout: variant === 'minimal' 
              ? window.google.translate.TranslateElement.InlineLayout.SIMPLE 
              : window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false,
            multilanguagePage: true,
          },
          'google_translate_element'
        );
      }
    };

    return () => {
      // Cleanup script on unmount
      const scriptElement = document.getElementById('google-translate-script');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [variant]);

  return (
    <div className="google-translate-wrapper">
      <div id="google_translate_element"></div>
      
      {/* Custom Styles for Google Translate */}
      <style jsx global>{`
        /* Hide Google Translate banner */
        .goog-te-banner-frame {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }
        
        /* Wrapper styling */
        .google-translate-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        /* Style the translate element wrapper */
        #google_translate_element {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        /* Hide all default gadget text */
        .goog-te-gadget {
          font-size: 0 !important;
          color: transparent !important;
          line-height: 0 !important;
        }
        
        /* Clean button styling */
        .goog-te-gadget-simple {
          background: transparent !important;
          border: none !important;
          padding: 8px !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 8px !important;
          min-width: auto !important;
          height: auto !important;
        }
        
        .goog-te-gadget-simple:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
        
        /* Hide everything inside the button */
        .goog-te-gadget-simple * {
          display: none !important;
        }
        
        /* Show globe icon via pseudo-element */
        .goog-te-gadget-simple::before {
          content: "" !important;
          display: block !important;
          width: 20px !important;
          height: 20px !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418' /%3E%3C/svg%3E") !important;
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
          opacity: 0.8 !important;
        }
        
        .goog-te-gadget-simple:hover::before {
          opacity: 1 !important;
        }
        
        /* Hide powered by and logo */
        .goog-logo-link,
        a.goog-logo-link,
        .goog-te-gadget > span {
          display: none !important;
        }
        
        /* Hide the gadget icon */
        .goog-te-gadget-icon {
          display: none !important;
        }
        
        /* Hide all images (dropdown arrows) */
        .goog-te-gadget-simple img {
          display: none !important;
        }
        
        /* Hide menu value text */
        .goog-te-gadget-simple .goog-te-menu-value {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
