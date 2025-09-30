import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <>
    <div>
        <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Grammar Test</h1>
        <p className="mb-4 text-lg">
            This grammar test is designed to assess your understanding of various grammatical concepts. Please read each question carefully and select the correct answer from the options provided.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>There are 10 multiple-choice questions.</li>
            <li>Each question has only one correct answer.</li>
            <li>You will receive immediate feedback after selecting an answer.</li>
            <li>Your score will be displayed at the end of the test.</li>
            <li>Try to answer all questions to the best of your ability.</li>
            </ul>
        </div>
    </div>
    <div className="flex justify-center mb-10">
        <a href="/english-test/grammer/test1">
        <Button variant={"default"}>
            Start Test
        </Button>
        </a>

    </div>
    </>
  )
}

export default page
