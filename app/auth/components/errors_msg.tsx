//componente de la imagen de error
import { FieldErrors } from 'react-hook-form';
import { formState } from '../types/form_state';
import { Alert, AlertDescription } from '@/common/components/atoms/alert';

interface ErrorsProps {
  errors: FieldErrors<formState>;
}

const Errors = ({ errors }: ErrorsProps) => {
    const errorMessages = Object.values(errors);
    if (errorMessages.length === 0) return null;
    return (
        <Alert className=" bg-red-50  border-red-200">
              <AlertDescription className=" text-red-700 space-y-1">
                {errorMessages.map((error, index) => (
                  <p key={index}>{error.message}</p>
                ))}
              </AlertDescription>
            </Alert>
    );
};

export default Errors;