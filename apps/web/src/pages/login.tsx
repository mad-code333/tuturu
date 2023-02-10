import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import HeaderX from '../components/metadata/HeaderX';
import DefaultLayout from '../components/layouts/DefaultLayout';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { AuthFormFields, authenticate } from '../utils/auth-handler';
import AuthForm from '../components/auth/AuthForm';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {
        initialSession: session,
        user: session.user,
      },
    };

  return {
    props: {},
  };
};

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleLogin = async ({ email, password }: AuthFormFields) => {
    try {
      if (!password || !email) throw new Error('Please fill in all fields');

      await authenticate({
        supabaseClient,
        method: 'login',
        email,
        password,
      });

      // If there is a redirectedFrom URL, redirect to it
      // Otherwise, redirect to the homepage
      const { redirectedFrom: nextUrl } = router.query;
      router.push(nextUrl ? nextUrl.toString() : '/');
    } catch (error: any) {
      showNotification({
        title: 'Error',
        message: error?.message || error || 'Something went wrong',
        color: 'red',
      });
    }
  };

  return (
    <>
      <HeaderX label="Tuturuuu — Log in" />
      <AuthForm
        title="Welcome back"
        description="Log in to your account"
        submitLabel="Log in"
        submittingLabel="Logging in"
        secondaryAction={{
          description: "Don't have an account?",
          label: 'Sign up',
          href: '/signup',
        }}
        onSubmit={handleLogin}
        disableForgotPassword={false}
        hideForgotPassword={false}
      />
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout hideNavLinks hideFooter>
      {page}
    </DefaultLayout>
  );
};

export default LoginPage;
