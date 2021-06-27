import Document, { Html, Head, Main, NextScript } from "next/document";

type DocProps = {};

/**
 * Custom document
 * @see https://nextjs.org/docs/advanced-features/custom-document
 */
class AppDocument extends Document<DocProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
