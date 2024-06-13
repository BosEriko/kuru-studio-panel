"use client";
import { useState } from 'react';
import { request } from 'graphql-request';
import { Input } from 'antd';
import SignInTenantMutation from "../../_definitions/mutations/tenant/sign-in";
import CreateTenantMutation from "../../_definitions/mutations/tenant/create";
import authenticate from "@/app/_utilities/authenticate";

import Atom from "@atom";

const Authenticate: React.FunctionComponent = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const { login } = authenticate();

  const handleSubmit = async () => {
    try {
      const variables = {
        identifier,
        password,
      };

      const mutation = isSignIn ? SignInTenantMutation : CreateTenantMutation;

      const data = await request("http://localhost:3001/data", mutation, variables);
      if (isSignIn) {
        login(data?.token);
      }
      console.log(`Successful ${isSignIn ? 'Sign In' : 'Register'}:`, data);
    } catch (error) {
      console.error(`Error ${isSignIn ? 'Sign In' : 'Register'}:`, error);
    }
  };

  return (
    <div className="bg-[#cd3c2b] flex flex-col gap-5 justify-center items-center w-screen h-screen">
      <Atom.Logo width={100} height={100} />
      <div className="w-full max-w-80 bg-white rounded shadow p-5 flex flex-col gap-3">
        <div className="text-center text-2xl text-gray-600 mb-4">{isSignIn ? "Sign In" : "Register"}</div>
        <Atom.Input
          type="text"
          placeholder="Identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <Input.Password
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <Atom.Button type="link" className="hover:underline text-[#cd3c2b] p-0 m-0" onClick={null}>Forgot Password?</Atom.Button>
          <Atom.Button onClick={handleSubmit}>{isSignIn ? "Sign In" : "Register"}</Atom.Button>
        </div>
      </div>
      <div className="mb-40">
        <Atom.Button type="link" className="text-white !hover:text-white hover:underline" onClick={() => setIsSignIn(!isSignIn)}>
          {!isSignIn ? "Sign In" : "Register"}
        </Atom.Button>
      </div>
    </div>
  );
};

export default Authenticate;