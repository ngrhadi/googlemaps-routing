import React from "react";

export const lazyLoader = (importComp, fallback) => {
  return class extends React.Component {
    state = {
      component: null, //initializing state
      loading: false
    };

    //loading the component and setting it to state
    componentDidMount() {
      this.setState({ loading: false })
      setTimeout(() => {
        this.setState({ loading: true })
        importComp().then((comp) => this.setState({ component: comp.default }));
      }, 1500);
    }

    //rendering the component
    render() {
      const C = this.state.component;
      return C ? (
        <C {...this.props} />
      ) : fallback ? (
        fallback
      ) : (
        <div className="absolute w-full h-screen text-white bg-zinc-900 flex items-center text-3xl justify-center">
          <div className="radial-progress animate-spin" style={{
            "--value": 70,
          }}>🌏</div>
        </div>
      );
    }
  };
};
