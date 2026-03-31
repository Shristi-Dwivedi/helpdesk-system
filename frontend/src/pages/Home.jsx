import logo from "../images/helpdesk.png";

function Home() {
  return (
    <div className="page-container">
      <img src={logo} alt="HelpDesk Logo" className="logo" />
      <h1>Welcome to HelpDesk System</h1>
      {/* About Helpdesk */}
      <p className="about">HelpDesk System is a chat-based support system which allows users to raise tickets and get assistance from chatbots.<br/>
        It is a role-based system where users can have different roles such as admin, support agent, and customer. <br/>
        Each role has specific permissions and access levels to ensure efficient ticket management and support resolution.<br/>
        The ticket resolution time and the number of tickets resolved are tracked and shown in form of graphical charts.<br/>
      </p>
    </div>
  );
}

export default Home;