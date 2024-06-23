import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
export const metadata = {
  title: "gaurav's chatgpt",
  description: "Chat with Gaurav's AI assistant",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
