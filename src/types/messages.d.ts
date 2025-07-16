declare module '@/messages/en.json' {
  interface Messages {
    metadata?: {
      title?: string;
      description?: string;
      keywords?: string;
    };
    navigation?: {
      home?: string;
      services?: string;
      projects?: string;
      about?: string;
      contact?: string;
      language?: string;
      french?: string;
      english?: string;
    };
    errors?: {
      pageNotFound?: string;
      pageNotFoundMessage?: string;
      somethingWentWrong?: string;
      tryAgain?: string;
      goBackHome?: string;
    };
  }
  
  const messages: Messages;
  export default messages;
}

declare module '@/messages/fr.json' {
  // Same structure as en.json
  interface Messages {
    metadata?: {
      title?: string;
      description?: string;
      keywords?: string;
    };
    navigation?: {
      home?: string;
      services?: string;
      projects?: string;
      about?: string;
      contact?: string;
      language?: string;
      french?: string;
      english?: string;
    };
    errors?: {
      pageNotFound?: string;
      pageNotFoundMessage?: string;
      somethingWentWrong?: string;
      tryAgain?: string;
      goBackHome?: string;
    };
  }
  
  const messages: Messages;
  export default messages;
}
