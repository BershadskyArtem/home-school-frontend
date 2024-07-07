import SignInForm from '../components/ui/Authentification/SignIn/SignInForm'
import { Container } from '@mantine/core'

export default function SignInPage() {
  return (
    <div className='flex justify-center items-center min-h-svh'>
        <Container size="xs">
            <SignInForm/>
        </Container>
    </div>
    
  );
}
