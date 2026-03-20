interface PlivoClient {
  on(event: string, callback: (...args: any[]) => void): void;
  call(uri: string, headers?: Record<string, string>): Promise<any>;
  hangup(): void;
  login(user: string, pass: string): void;
  loginWithAccessToken(token: string): void;
  logout(): void;
  setConnectTone(enabled: boolean): void;
}

interface PlivoBrowserSDK {
  client: PlivoClient;
}

interface Window {
  Plivo: new (options: Record<string, any>) => PlivoBrowserSDK;
}
