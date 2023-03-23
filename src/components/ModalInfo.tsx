import React from 'react';

interface ModalProps {
    showModal: boolean;
    modalData: {
        name: string;
        diagnostic: string;
        coverage: number;
        sDate: string;
        eDate: string;
        nDoctor: string;
    };
    closeModal: () => void;
}

const ModalInfo: React.FC<ModalProps> = ({ showModal, modalData, closeModal }) => {
    return (
        <div className={`modal modal-bottom sm:modal-middle ${showModal ? "modal-open" : ""}`}>
            <div className="modal-box">
                <h3 className="font-bold text-xl text-center mb-2">Employee Information</h3>
                <div className="card">
                        <div className="flex border-t border-white">
                            <p>
                                <span className="text-lg text-orange-200">Employee: </span>
                                {modalData.name}
                            </p>
                        </div>
                        <div className="border-t border-white">
                        <p>
                            <span className="text-lg text-orange-200">Doctor's Name: </span>
                            {modalData.nDoctor}
                        </p>
                        </div>
                        <div className="border-t border-white">
                        <p>
                            <span className="text-lg text-orange-200">Diagnostic: </span>
                            {modalData.diagnostic}
                        </p>
                        </div>
                        <div className="border-t border-white">
                        <p>
                            <span className="text-lg text-orange-200">Coverage Days: </span>
                            {modalData.coverage}
                        </p>
                        </div>
                        <div className="border-t border-white">
                        <p>
                            <span className="text-lg text-orange-200">Start Date: </span>
                            {modalData.sDate}
                        </p>
                        </div>
                        <div className="border-t border-white">
                        <p>
                            <span className="text-lg text-orange-200">End Date: </span>
                            {modalData.eDate}
                        </p>
                        </div>
                    </div>
                <div className="modal-action">
                    <label htmlFor="my-modal-6" className="btn" onClick={closeModal}>
                        Close
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ModalInfo;