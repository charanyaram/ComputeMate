'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { QrGenerateRequest, QrGenerateResponse } from '@/utils/service';
import { QrCard } from '@/components/QrCard';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import LoadingDots from '@/components/ui/loadingdots';
import va from '@vercel/analytics';
import { PromptSuggestion } from '@/components/PromptSuggestion';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';

const FormSchema = {
  computingQuestion: '',
  unitDetails: {
    unitCode: '',
    unitName: '',
    difficultyLevel: '', // One of ['Easy', 'Medium', 'Hard']
    interestLevel: '', // One of ['Low', 'Medium', 'High']
  },
};

const Body = () => {
  const [questionType, setQuestionType] = useState('computing');
  const [message, setMessage] = useState('');
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: FormSchema,
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
                  render={({ field }) => (
                    <Textarea
                      id="computingQuestion"
                      placeholder="Enter your question here"
                      {...field}
                    />
                  )}
                />
              </div>
            )}

            {questionType === 'unit' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="unitCode" className="block font-medium">
                    Unit Code
                  </label>
                  <Controller
                    name="unitDetails.unitCode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="unitCode"
                        placeholder="e.g., COMP1234"
                        {...field}
                      />
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="unitName" className="block font-medium">
                    Unit Name
                  </label>
                  <Controller
                    name="unitDetails.unitName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="unitName"
                        placeholder="e.g., Introduction to Computing"
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="mt-4">
              Submit
            </Button>
            {message && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}
          </form>
        </div>
        <div className="col-span-1">
          {/* {submittedURL && (
            <>
              <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0 sm:text-center text-left">
                Your QR Code
              </h1>
              <div>
                <div className="flex flex-col justify-center relative h-auto items-center">
                  {response ? (
                    <QrCard
                      imageURL={response.image_url}
                      time={(response.model_latency_ms / 1000).toFixed(2)}
                    />
                  ) : (
                    <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto animate-pulse bg-gray-400 aspect-square max-w-full" />
                  )}
                </div>
                {response && (
                  <div className="flex justify-center gap-5 mt-4">
                    <Button onClick={() => {}}>Download</Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://qrgpt.io/start/${id || ''}`,
                        );
                        toast.success('Link copied to clipboard');
                      }}
                    >
                      ✂️ Share
                    </Button>
                  </div>
                )}
              </div>
            </>
          )} */}
          <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto animate-pulse bg-gray-400 aspect-square max-w-full" />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Body;
