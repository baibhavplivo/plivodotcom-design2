"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

// Simple syntax highlighter
function highlightCode(code: string, language: string): JSX.Element[] {
  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    const tokens: JSX.Element[] = [];
    let remaining = line;
    let tokenIndex = 0;

    // Process the line for syntax highlighting
    while (remaining.length > 0) {
      let matched = false;

      // Comments
      const commentMatch = remaining.match(/^(#.*|\/\/.*|\/\*.*?\*\/)/);
      if (commentMatch) {
        tokens.push(<span key={tokenIndex++} className="text-gray-400 italic">{commentMatch[0]}</span>);
        remaining = remaining.slice(commentMatch[0].length);
        matched = true;
        continue;
      }

      // Strings (double quotes)
      const doubleStringMatch = remaining.match(/^"([^"\\]|\\.)*"/);
      if (doubleStringMatch) {
        tokens.push(<span key={tokenIndex++} className="text-emerald-600">{doubleStringMatch[0]}</span>);
        remaining = remaining.slice(doubleStringMatch[0].length);
        matched = true;
        continue;
      }

      // Strings (single quotes)
      const singleStringMatch = remaining.match(/^'([^'\\]|\\.)*'/);
      if (singleStringMatch) {
        tokens.push(<span key={tokenIndex++} className="text-emerald-600">{singleStringMatch[0]}</span>);
        remaining = remaining.slice(singleStringMatch[0].length);
        matched = true;
        continue;
      }

      // Keywords
      const keywordMatch = remaining.match(/^(import|from|require|include|use|package|class|def|function|func|let|const|var|if|else|try|catch|rescue|begin|end|return|new|nil|null|None|true|false|True|False|public|private|static|void|namespace|using|throws|throw|async|await|export|default)\b/);
      if (keywordMatch) {
        tokens.push(<span key={tokenIndex++} className="text-purple-600 font-medium">{keywordMatch[0]}</span>);
        remaining = remaining.slice(keywordMatch[0].length);
        matched = true;
        continue;
      }

      // Built-in functions/methods
      const builtinMatch = remaining.match(/^(print|puts|console|fmt|System|Console|print_r|println|printf)\b/);
      if (builtinMatch) {
        tokens.push(<span key={tokenIndex++} className="text-blue-600">{builtinMatch[0]}</span>);
        remaining = remaining.slice(builtinMatch[0].length);
        matched = true;
        continue;
      }

      // Class/Type names (capitalized words)
      const classMatch = remaining.match(/^[A-Z][a-zA-Z0-9_]*(?=\s*[.(]|\s*::|\s*\{)/);
      if (classMatch) {
        tokens.push(<span key={tokenIndex++} className="text-cyan-600">{classMatch[0]}</span>);
        remaining = remaining.slice(classMatch[0].length);
        matched = true;
        continue;
      }

      // Numbers
      const numberMatch = remaining.match(/^\b\d+\.?\d*\b/);
      if (numberMatch) {
        tokens.push(<span key={tokenIndex++} className="text-orange-500">{numberMatch[0]}</span>);
        remaining = remaining.slice(numberMatch[0].length);
        matched = true;
        continue;
      }

      // Method calls (word followed by parenthesis)
      const methodMatch = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/);
      if (methodMatch) {
        tokens.push(<span key={tokenIndex++} className="text-blue-600">{methodMatch[0]}</span>);
        remaining = remaining.slice(methodMatch[0].length);
        matched = true;
        continue;
      }

      // Property access
      const propMatch = remaining.match(/^\.([a-zA-Z_][a-zA-Z0-9_]*)/);
      if (propMatch) {
        tokens.push(<span key={tokenIndex++} className="text-gray-700">.</span>);
        tokens.push(<span key={tokenIndex++} className="text-sky-600">{propMatch[1]}</span>);
        remaining = remaining.slice(propMatch[0].length);
        matched = true;
        continue;
      }

      // Operators and punctuation
      const opMatch = remaining.match(/^[{}()[\];:,=<>+\-*\/&|!?@$%^~`\\]+/);
      if (opMatch) {
        tokens.push(<span key={tokenIndex++} className="text-gray-500">{opMatch[0]}</span>);
        remaining = remaining.slice(opMatch[0].length);
        matched = true;
        continue;
      }

      // Default: take one character
      if (!matched) {
        tokens.push(<span key={tokenIndex++} className="text-gray-700">{remaining[0]}</span>);
        remaining = remaining.slice(1);
      }
    }

    return (
      <div key={lineIndex} className="leading-relaxed">
        {tokens.length > 0 ? tokens : '\u00A0'}
      </div>
    );
  });
}

const languages = [
  { id: "ruby", name: "Ruby" },
  { id: "python", name: "Python" },
  { id: "nodejs", name: "Node.js" },
  { id: "go", name: "Go" },
  { id: "php", name: "PHP" },
  { id: "java", name: "Java" },
  { id: "dotnet", name: ".NET" },
  { id: "curl", name: "cURL" },
];

const codeSnippets: Record<string, string> = {
  ruby: `require "rubygems"
require "/usr/src/app/lib/plivo.rb"
include Plivo

api = RestClient.new("<auth_id>", "<auth_token>")

# Create Session (Send OTP)
begin
  response = api.verify_session.create(
    nil,
    "<dest_number>",
    "",
    nil,
    nil,
    nil
  )
  print response
rescue PlivoRESTError => e
  puts 'Exception: ' + e.message
end

# Validate Session (Validate OTP)
begin
  response = api.verify_session.validate(
    "<session_uuid>",
    "<otp>"
  )
  print response
rescue PlivoRESTError => e
  puts 'Exception: ' + e.message
end`,

  python: `import sys
sys.path.append("../plivo-python")

import plivo

client = plivo.RestClient('<auth_id>','<auth_token>')

# Create Session (Send OTP)
response = client.verify_session.create(recipient='<dest_number>')
print(response)

# Validate Session (Validate OTP)
response = client.verify_session.validate(
    session_uuid='<session_uuid>',
    otp='<otp>'
)
print(response)`,

  nodejs: `let plivo = require('plivo')
let client = new plivo.Client('<auth_id>','<auth_token>');

// Create Session (Send OTP)
client.verify_session.create({
    recipient: '<dest_number>',
    method: '',
    channel: '',
    locale: ''
}).then(function(response) {
    console.log(response)
}).catch(function(error) {
    console.error(error);
});

// Validate Session (Validate OTP)
client.verify_session.validate({
    id: '<session_uuid',
    otp: '<otp>'
}).then(function(response) {
    console.log(response)
}).catch(function(error) {
    console.log(error)
});`,

  go: `package main

import (
    "fmt"
    "github.com/plivo/plivo-go"
)

func main() {
    client, err := plivo.NewClient(
        "<auth_id>",
        "<auth_token>",
        &plivo.ClientOptions{}
    )
    if err != nil {
        fmt.Printf("Error:\\n", err)
    }

    // Create Session (Send OTP)
    responseTS, err := client.VerifySession.Create(
        plivo.SessionCreateParams{
            Recipient: "<dest_number>"
        }
    )
    if err != nil {
        fmt.Print("Error", err.Error())
        return
    }
    fmt.Printf("Response: \\n%#v\\n", responseTS)

    // Validate Session (Validate OTP)
    responseTG, err := client.VerifySession.Validate(
        plivo.SessionValidationParams{OTP: "<otp>"},
        "<session_uuid>"
    )
    if err != nil {
        fmt.Print("Error", err.Error())
        return
    }
    fmt.Printf("Response: \\n%#v\\n", responseTG)
}`,

  php: `<?php
require '/usr/src/app/vendor/autoload.php';
use Plivo\\RestClient;

$client = new RestClient("<auth_id>", "<auth_token>");

// Create Session (Send OTP)
try {
    $response = $client->verifySessions->create("<dest_number>");
    print_r($response);
}
catch (Exception $ex) {
    print_r($ex);
}

// Validate Session (Validate OTP)
try {
    $response = $client->verifySessions->validate(
        "<session_uuid>",
        "<otp>"
    );
    print_r($response);
}
catch (Exception $ex) {
    print_r($ex);
}
?>`,

  java: `import java.io.IOException;
import com.plivo.api.Plivo;
import com.plivo.api.exceptions.PlivoRestException;
import com.plivo.api.models.verify_session.VerifySession;
import com.plivo.api.models.verify_session.SessionCreateResponse;

class Session {
    public static void main(String[] args) {
        Plivo.init("<auth_id", "<auth_token>");

        // Create Session (Send OTP)
        try {
            SessionCreateResponse response = VerifySession.creator(
                "",
                "<dest_number>", "", "", "", ""
            ).create();
            System.out.println(response);
        }
        catch (PlivoRestException | IOException e) {
            e.printStackTrace();
        }

        // Validate Session (Validate OTP)
        try {
            SessionCreateResponse response = VerifySession.validation(
                "<session_uuid>",
                "<otp>"
            ).create();
            System.out.println(response);
        }
        catch (PlivoRestException | IOException e) {
            e.printStackTrace();
        }
    }
}`,

  dotnet: `using System;
using Plivo;
using Plivo.Exception;

namespace dotnet_sdk
{
    class Session
    {
        static void Main(string[] args)
        {
            var api = new PlivoApi("<auth_id>", "<auth_token>");

            // Create Session (Send OTP)
            try {
                var response = api.VerifySession.Create(
                    recipient: "<dest_number>"
                );
                Console.WriteLine(response);
            }
            catch (PlivoRestException e) {
                Console.WriteLine("Exception: " + e.Message);
            }

            // Validate Session (Validate OTP)
            try {
                var response = api.VerifySession.Validate(
                    session_uuid: "<session_uuid>",
                    otp: "<otp>"
                );
                Console.WriteLine(response);
            }
            catch (PlivoRestException e) {
                Console.WriteLine("Exception: " + e.Message);
            }
        }
    }
}`,

  curl: `# Create Session (Send OTP)
curl 'https://api.plivo.com/v1/Account/<auth_id>/Verify/Session/' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Basic xxx' \\
--data '{
    "recipient": "<dest_number>",
    "channel": "sms",
    "url": "<callback_url>",
    "method": "POST",
    "app_uuid": "<app_uuid>"
}'

# Validate Session (Validate OTP)
curl 'https://api.plivo.com/v1/Account/<auth_id>/Verify/Session/<session_uuid>/' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Basic xxx' \\
--data '{
    "otp": "<otp>"
}'`,
};

export default function VerifyCodeSection() {
  const [activeLanguage, setActiveLanguage] = useState("python");
  const [copied, setCopied] = useState(false);

  const highlightedCode = useMemo(() => {
    return highlightCode(codeSnippets[activeLanguage], activeLanguage);
  }, [activeLanguage]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets[activeLanguage]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4">
              Switch to Plivo in under 5 minutes
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              Plivo's Verify API is designed to 'Go live in one sprint'. Our developer-first APIs and sample code can slash implementation time by 90% so your business never misses a beat!
            </p>
            <a
              href="https://www.plivo.com/docs/programmable-api/verify/overview"
              className="inline-flex items-center gap-2 text-[#323dfe] font-medium hover:underline"
            >
              View full documentation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Right - Code Block */}
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
            {/* Language Tabs */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-1 overflow-x-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveLanguage(lang.id)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors",
                      activeLanguage === lang.id
                        ? "bg-[#323dfe] text-white"
                        : "text-gray-600 hover:text-black hover:bg-gray-200"
                    )}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-black hover:bg-gray-200 rounded-md transition-colors ml-2 flex-shrink-0"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="p-4 h-[400px] overflow-y-auto overflow-x-auto">
              <pre className="text-[13px] font-mono">
                <code>{highlightedCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
