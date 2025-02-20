import * as React from 'react';
import { useState } from 'react';
import Alert from './alert';

const EmailSender = () => {
    const [emails, setEmails] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [alert, setAlert] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleFileChange = (e) => {
      setAttachments([...e.target.files]);
    };

    const callAlert = (type, msg) => {
        setAlert({ type, msg });

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };

    const handleSendEmail = async (event) => {
        event.preventDefault(); 

        const emailList = emails.split(',').map(email => email.trim());
        setIsLoading(true);

        const formData = new FormData();
        formData.append('emails', emails);
        formData.append('subject', subject);
        formData.append('message', message);
        attachments.forEach(file => {
          formData.append('attachments', file);
      });

        try {
            const response = await fetch('http://localhost:5000/api/v1/user/sendmail', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setIsLoading(false);

            if (response.ok) {
                callAlert('success', 'Emails sent successfully!');
                setEmails('');
                setSubject('');
                setMessage('');
                setAttachments([]);
                document.getElementById('attachmentInput').value = '';
 
            } else {
                callAlert('error', data.message || 'Failed to send emails');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setIsLoading(false);
            callAlert('error', 'Something went wrong. Try again later.');
        }
    };

    return (
        <>
            <div className='text-white' style={{ height: '100vh', background: "#062147", paddingTop: "5vh" }}>
                <Alert alert={alert} />
                <div className="container mt-5" style={{ width: "500px", background: "#2b4261", padding: "20px", borderRadius: "10px" }}>
                    <h1 className="mt-2 text-primary">HP Mailer</h1>

                    <form className='mt-4' onSubmit={handleSendEmail}>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email addresses</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter emails (comma-separated)" 
                                value={emails} 
                                onChange={(e) => setEmails(e.target.value)} 
                                required 
                                id="emailInput" 
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="subjectInput" className="form-label">Subject</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Subject" 
                                value={subject} 
                                onChange={(e) => setSubject(e.target.value)} 
                                required 
                                id="subjectInput" 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="messageInput" className="form-label">Message</label>
                            <textarea 
                                className="form-control" 
                                placeholder="Message" 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                required 
                                id="messageInput" 
                                rows="4"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="attachmentInput" className="form-label">Attachment</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                id="attachmentInput" 
                                onChange={handleFileChange} 
                                multiple
                            />
                        </div>

                        <div className="mt-5">
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Mail'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EmailSender;
