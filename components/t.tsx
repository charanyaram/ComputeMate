'use client';
import { useForm, Controller } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';

const FormSchema = {
  computingQuestion: '',
  unitDetails: {
    unitCode1: '',
    university1: '',
    unitCode2: '',
    university2: '',
  },
};

const Body = () => {
  const [questionType, setQuestionType] = useState('computing');
  const [message, setMessage] = useState('');
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: FormSchema,
  });

  const onSubmit = (data: any) => {
    if (questionType === 'computing') {
      setMessage('Computing question submitted');
    } else {
      setMessage('Unit details submitted');
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-10">Generate a QR Code</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="questionType" className="block font-medium">
                Question Type
              </label>
              <div className="flex flex-row gap-2">
                <Button
                  type="button"
                  onClick={() => setQuestionType('computing')}
                  className={
                    questionType === 'computing'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }
                >
                  Computing
                </Button>

                <Button
                  type="button"
                  onClick={() => setQuestionType('unit')}
                  className={
                    questionType === 'unit'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }
                >
                  Unit
                </Button>
              </div>
            </div>

            {questionType === 'computing' && (
              <div>
                <label
                  htmlFor="computingQuestion"
                  className="block font-medium"
                >
                  Ask Your Computing Question
                </label>
                <Controller
                  name="computingQuestion"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <Textarea
                      id="computingQuestion"
                      placeholder="Enter your question here"
                      {...field}
                    />
                  )}
                />
                {errors.computingQuestion && (
                  <p className="text-red-500 text-sm">
                    {errors.computingQuestion.message}
                  </p>
                )}
              </div>
            )}

            {questionType === 'unit' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="unitCode1" className="block font-medium">
                    Unit Code 1
                  </label>
                  <Controller
                    name="unitDetails.unitCode1"
                    control={control}
                    rules={{ required: 'Unit Code 1 is required' }}
                    render={({ field }) => (
                      <Input
                        id="unitCode1"
                        placeholder="e.g., COMP1234"
                        {...field}
                      />
                    )}
                  />
                  {errors.unitDetails?.unitCode1 && (
                    <p className="text-red-500 text-sm">
                      {errors.unitDetails.unitCode1.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="university1" className="block font-medium">
                    University 1
                  </label>
                  <Controller
                    name="unitDetails.university1"
                    control={control}
                    rules={{ required: 'University 1 is required' }}
                    render={({ field }) => (
                      <Input
                        id="university1"
                        placeholder="e.g., Macquarie University"
                        {...field}
                      />
                    )}
                  />
                  {errors.unitDetails?.university1 && (
                    <p className="text-red-500 text-sm">
                      {errors.unitDetails.university1.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="unitCode2" className="block font-medium">
                    Unit Code 2
                  </label>
                  <Controller
                    name="unitDetails.unitCode2"
                    control={control}
                    rules={{ required: 'Unit Code 2 is required' }}
                    render={({ field }) => (
                      <Input
                        id="unitCode2"
                        placeholder="e.g., COMP2234"
                        {...field}
                      />
                    )}
                  />
                  {errors.unitDetails?.unitCode2 && (
                    <p className="text-red-500 text-sm">
                      {errors.unitDetails.unitCode2.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="university2" className="block font-medium">
                    University 2
                  </label>
                  <Controller
                    name="unitDetails.university2"
                    control={control}
                    rules={{ required: 'University 2 is required' }}
                    render={({ field }) => (
                      <Input
                        id="university2"
                        placeholder="e.g., Macquarie University"
                        {...field}
                      />
                    )}
                  />
                  {errors.unitDetails?.university2 && (
                    <p className="text-red-500 text-sm">
                      {errors.unitDetails.university2.message}
                    </p>
                  )}
                </div>
                {/* Add similar validation for other fields */}
              </div>
            )}

            <Button type="submit" className="mt-4">
              Submit
            </Button>
            {message && (
              <Alert variant="default">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Message</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </form>
        </div>

        <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto animate-pulse bg-gray-400 aspect-square max-w-full" />
      </div>
    </div>
  );
};

export default Body;
