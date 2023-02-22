import React from 'react'
import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
    return (
        <Navbar {...props}>
            <Navbar.Brand href="#">RSUITE</Navbar.Brand>
            <Nav onSelect={onSelect} activeKey={activeKey}>
                <Nav.Item eventKey="1" icon={<HomeIcon />}>
                    Home
                </Nav.Item>
                <Nav.Item eventKey="2">Cursos</Nav.Item>
                <Nav.Menu title="About">
                    <Nav.Item eventKey="4">Company</Nav.Item>
                    <Nav.Item eventKey="5">Team</Nav.Item>
                    <Nav.Item eventKey="6">Contact</Nav.Item>
                </Nav.Menu>
            </Nav>
            <Nav pullRight>
                <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
            </Nav>
        </Navbar>
    );
};
export const Navar = () => {
    const [activeKey, setActiveKey] = React.useState(null);
    return <>
        <CustomNavbar appearance="inverse" activeKey={activeKey} onSelect={setActiveKey} />
    </>
}
