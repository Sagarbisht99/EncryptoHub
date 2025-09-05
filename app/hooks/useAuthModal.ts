import { useClerk } from '@clerk/nextjs';

export const useAuthModal = () => {
  const { openSignIn, openSignUp } = useClerk();

  const openSignInModal = () => {
    openSignIn({
      appearance: {
        elements: {
          rootBox: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          },
          card: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
          },
        },
        layout: {
          socialButtonsPlacement: 'bottom',
        },
      },
    });
  };

  const openSignUpModal = () => {
    openSignUp({
      appearance: {
        elements: {
          rootBox: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          },
          card: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
          },
        },
        layout: {
          socialButtonsPlacement: 'bottom',
        },
      },
    });
  };

  return {
    openSignInModal,
    openSignUpModal,
  };
};
