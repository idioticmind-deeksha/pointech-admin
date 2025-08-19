import './footer.scss';
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer_copyright">
                <p>Ponitech @{new Date().getFullYear()}, All rights reserved  </p>
            </div>
        </footer>
    )
}