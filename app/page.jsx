import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        It's time to build your own AI assistant which will allow you to search
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered prompts</span>
      </h1>
      <p className="desc text-center">
        Get started with my AI assistant builder and create your own AI-powered
      </p>
      <Feed />
    </section>
  );
};

export default Home;
