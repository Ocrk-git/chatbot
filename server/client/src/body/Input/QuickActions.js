import React from "react";

const QuickActions = () => {
  const quickActionsCloseHandler = (event) => {
    var remove = document.getElementById("quick-actions");
    remove.classList.remove("quick-actions-show");
  };
  return (
    <div id='quick-actions' className='quick-actions'>
      <div className='dropdown-container' id='myDropdown'>
        <div
          className='dropdown-container-options'
          onClick={quickActionsCloseHandler}
        >
          <span>Options</span>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi
                    bi-chevron-down'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M1.646 4.646a.5.5 0 0 1
                        .708 0L8 10.293l5.646-5.647a.5.5 0 0 1
                        .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1
                        0-.708z'
              />
            </svg>
          </span>
        </div>
        <div className='dropdown-options-list'>
          <div className='dropdown-options'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi
                            bi-chat-dots-fill'
                viewBox='0 0 16 16'
              >
                <path
                  d='M16 8c0 3.866-3.582 7-8 7a9.06 9.06
                                0 0
                                1-2.347-.306c-.584.296-1.925.864-4.181
                                1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744
                                11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8
                                3.134
                                8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4
                                0a1
                                1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0
                                0-2
                                1 1 0 0 0 0 2z'
                />
              </svg>
            </span>
            <span className='option-list'>Chat with agent</span>
          </div>
          <div className='dropdown-options'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-whatsapp'
                viewBox='0 0 16
                                16'
              >
                <path
                  d='M13.601 2.326A7.854 7.854 0 0 0
                                    7.994 0C3.627 0 .068 3.558.064
                                    7.926c0
                                    1.399.366 2.76 1.057 3.965L0
                                    16l4.204-1.102a7.933 7.933 0 0 0
                                    3.79.965h.004c4.368 0 7.926-3.558
                                    7.93-7.93A7.898 7.898 0 0 0 13.6
                                    2.326zM7.994 14.521a6.573 6.573 0 0
                                    1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56
                                    6.56 0 0 1-1.007-3.505c0-3.626
                                    2.957-6.584 6.591-6.584a6.56 6.56 0
                                    0 1
                                    4.66 1.931 6.557 6.557 0 0 1 1.928
                                    4.66c-.004 3.639-2.961 6.592-6.592
                                    6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729
                                    0 0
                                    0-.529.247c-.182.198-.691.677-.691
                                    1.654 0 .977.71 1.916.81
                                    2.049.098.133
                                    1.394 2.132 3.383
                                    2.992.47.205.84.326
                                    1.129.418.475.152.904.129
                                    1.246.08.38-.058 1.171-.48
                                    1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z'
                />
              </svg>
            </span>
            <span className='option-list'>Whatsapp us</span>
          </div>
          <div className='dropdown-options'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi
                                    bi-telephone-outbound-fill'
                viewBox='0 0
                                    16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M1.885.511a1.745 1.745 0 0 1
                                        2.61.163L6.29
                                        2.98c.329.423.445.974.315
                                        1.494l-.547 2.19a.678.678 0 0 0
                                        .178.643l2.457 2.457a.678.678 0
                                        0 0
                                        .644.178l2.189-.547a1.745 1.745
                                        0 0
                                        1 1.494.315l2.306
                                        1.794c.829.645.905
                                        1.87.163 2.611l-1.034
                                        1.034c-.74.74-1.846
                                        1.065-2.877.702a18.634 18.634 0
                                        0
                                        1-7.01-4.42 18.634 18.634 0 0
                                        1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11
                                        .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1
                                        .5.5v4a.5.5 0 0 1-1
                                        0V1.707l-4.146
                                        4.147a.5.5 0 0
                                        1-.708-.708L14.293
                                        1H11.5a.5.5 0 0 1-.5-.5z'
                />
              </svg>
            </span>
            <span className='option-list'>call us</span>
          </div>
          <div className='dropdown-options'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi
                                        bi-arrow-counterclockwise'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M8
                                            3a5
                                            5 0 1 1-4.546 2.914.5.5 0 0
                                            0-.908-.417A6 6 0 1 0 8
                                            2v1z'
                />
                <path
                  d='M8
                                                4.466V.534a.25.25 0
                                                0 0-.41-.192L5.23
                                                2.308a.25.25 0 0 0 0
                                                .384l2.36 1.966A.25.25 0
                                                0 0
                                                8 4.466z'
                />
              </svg>
            </span>
            <span className='option-list'>Restart us</span>
          </div>
          <div className='powered-by-ocrk'>
            <p>
              Powered by
              <span> OCRK</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
