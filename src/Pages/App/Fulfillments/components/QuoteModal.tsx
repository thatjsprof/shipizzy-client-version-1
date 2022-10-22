import React from "react";
import UIModal from "Components/UI/Modal/Modal.component";

interface IQuoteModal {
  show: boolean;
  title: string;
  close: () => void;
}

const QuoteModal = ({ title, show, close }: IQuoteModal) => {
  return <UIModal open={show} title={title} handleClose={close}></UIModal>;
};

export default QuoteModal;
