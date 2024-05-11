"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { SignUpButton } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa6";

export default function SignInPage() {
  return (
    <>
      <main className="grid place-items-center h-[80%]">
        <SignIn.Root>
          <div className="border-2 border-base-200 shadow-md rounded-lg p-6 bg-base-300">
            <SignIn.Step name="start">
              <h1 className="text-4xl font-bold mb-8">
                Sign in to Study Machine
              </h1>

              <div className="flex gap-2 mb-4">
                <Clerk.Connection
                  name="github"
                  className="btn btn-neutral flex-1">
                  <FaGithub size={24} />
                </Clerk.Connection>
              </div>

              <Clerk.Field name="identifier" className="form-control">
                <Clerk.Label className="label">Email</Clerk.Label>
                <Clerk.Input className="input input-bordered" />
                <Clerk.FieldError />
              </Clerk.Field>

              <Clerk.Field name="password" className="form-control">
                <Clerk.Label className="label">Password</Clerk.Label>
                <Clerk.Input className="input input-bordered" />
                <Clerk.FieldError />
              </Clerk.Field>

              <div className="form-control mt-6">
                <SignIn.Action className="btn btn-primary" submit>
                  Continue
                </SignIn.Action>
              </div>
              <div className="flex flex-col justify-center">
                <SignUpButton>
                  <button className="btn btn-link">Create an account</button>
                </SignUpButton>
              </div>
            </SignIn.Step>
          </div>
        </SignIn.Root>
      </main>
    </>
  );
}
