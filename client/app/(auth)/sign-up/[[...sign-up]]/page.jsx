"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { SignInButton } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa6";
export default function SignUpPage() {
  return (
    <>
      <main className="grid place-items-center h-[80%]">
        <SignUp.Root>
          <div className="border-2 border-base-200 shadow-md rounded-lg p-6 bg-base-300">
            <SignUp.Step name="start">
              <h1 className="text-4xl font-bold mb-8">
                Sign up to Study Machine
              </h1>

              <div className="flex gap-2 mb-4">
                <Clerk.Connection
                  name="github"
                  className="btn btn-neutral flex-1">
                  <FaGithub size={24} />
                </Clerk.Connection>
              </div>

              <Clerk.Field name="username" className="form-control">
                <Clerk.Label className="label">Username</Clerk.Label>
                <Clerk.Input className="input input-bordered" />
                <Clerk.FieldError />
              </Clerk.Field>

              <Clerk.Field name="emailAddress" className="form-control">
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
                <SignUp.Action className="btn btn-primary" submit>
                  Sign up
                </SignUp.Action>
              </div>
              <div className="flex flex-col justify-center">
                <SignInButton>
                  <button className="btn btn-link">Sign In</button>
                </SignInButton>
              </div>
            </SignUp.Step>

            <SignUp.Step name="continue">
              <h1 className="text-3xl font-bold mb-8">
                Fill in missing fields
              </h1>

              <Clerk.Field name="username" className="form-control">
                <Clerk.Label className="label">Username</Clerk.Label>
                <Clerk.Input className="input input-bordered" />
                <Clerk.FieldError />
              </Clerk.Field>

              <div className="form-control mt-6">
                <SignUp.Action className="btn btn-primary" submit>
                  Continue
                </SignUp.Action>
              </div>
            </SignUp.Step>

            <SignUp.Step name="verifications">
              <SignUp.Strategy name="phone_code">
                <h1 className="text-3xl font-bold mb-8">
                  Check your phone for an SMS
                </h1>

                <Clerk.Field name="code" className="form-control">
                  <Clerk.Label className="label">Phone Code</Clerk.Label>
                  <Clerk.Input className="input input-bordered" />
                  <Clerk.FieldError />
                </Clerk.Field>
                <div className="form-control mt-6">
                  <SignUp.Action className="btn btn-primary" submit>
                    Verify
                  </SignUp.Action>
                </div>
              </SignUp.Strategy>

              <SignUp.Strategy name="email_code">
                <h1 className="text-3xl font-bold mb-8">Check your email</h1>

                <Clerk.Field name="code" className="form-control">
                  <Clerk.Label className="label">Email Code</Clerk.Label>
                  <Clerk.Input className="input input-bordered" />
                  <Clerk.FieldError />
                </Clerk.Field>

                <div className="form-control mt-6">
                  <SignUp.Action className="btn btn-primary" submit>
                    Verify
                  </SignUp.Action>
                </div>
              </SignUp.Strategy>
            </SignUp.Step>
          </div>
        </SignUp.Root>
      </main>
    </>
  );
}
