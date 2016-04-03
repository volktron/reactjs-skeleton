import { Header } from "./header.js"

var api_uri = "http://localhost:8000/api/";
ajax.base_uri = api_uri;

class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            is_authenticated: false
        };

        var layout = this;

        ajax.get({
            url : "auth_status",
            success : function(data){
                layout.setState({is_authenticated: data == "True" ? true : false});
            }
        });
    }

    setAuthenticationState(is_authenticated){
        this.setState({is_authenticated});
    }

    render() {
        return (
            <div>
                <Header is_authenticated={this.state.is_authenticated}
                        setAuthenticationState={this.setAuthenticationState.bind(this)}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Layout />,
    document.getElementById('app')
);
