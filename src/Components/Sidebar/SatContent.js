import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Content = () => {
  const [selectedRadio, setSelectedRadio] = useState();

  const [columnWidths, setColumnWidths] = useState({
    column1: '50%',
    column2: '50%',
  });

  const toggleColumnWidth = (column) => {
    setColumnWidths((prevWidths) => {
      const isExpanded = prevWidths[column] === '70%';

      const updatedWidths = {
        ...prevWidths,
      };

      if (isExpanded) {
        updatedWidths[column] = '50%';
      } else {
        updatedWidths[column] = '70%';
      }

      // If we're expanding one column, reduce the other column's width
      if (!isExpanded) {
        const otherColumn = column === 'column1' ? 'column2' : 'column1';
        updatedWidths[otherColumn] = '50%';
      }

      return updatedWidths;
    });
  };

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.id);
  };

  const handleDivClick = (radioId) => {
    const radio = document.getElementById(radioId);
    if (radio) {
      radio.checked = true;
      setSelectedRadio(radioId);
    }
  };

  useEffect(() => {
    // Cleanup the event listeners when the component unmounts
    return () => {
      const radioButtons = document.querySelectorAll('input[type="radio"]');
      radioButtons.forEach((radio) => {
        radio.removeEventListener('change', handleRadioChange);
      });
    };
  }, []);

  return (
    <div className="content">
      <div className="column" style={{ flex: columnWidths.column1 }}>
            <button className='column1_max' onClick={() => toggleColumnWidth('column1')}>
                    <i class="fa fa-window-maximize" style={{
                    fontSize: "20px"
                    }}></i>
            </button>
            The golden-crowned kinglet is a small songbird found throughout North America. It has a few commonalities with like-songbirds; however, the golden-crowned kinglet's ________ characteristics, such as its yellow crown, white wing bars, and black stripes over the eyes, set it apart from other birds. In addition, its high-pitched, one-note call and fearlessness around humans make it a favorite of birdwatchers.
      </div>
      <div className="column" style={{ flex: columnWidths.column2 }}>
            <button className='column2_max' onClick={() => toggleColumnWidth('column2')}>
                    <i class="fa fa-window-maximize" style={{
                    fontSize: "20px"
                    }}></i>
            </button>
            <div className='questiontext'>
                Which choice completes the text with the most logical and precise word or phrase?
            </div>
            <div
            className={`custom-radio ${selectedRadio === 'radio1' ? 'selected' : ''}`}
            onClick={() => handleDivClick('radio1')}
            >
            <input
                type="radio"
                id="radio1"
                name="radio-group"
                checked={selectedRadio === 'radio1'}
                onChange={handleRadioChange}
            />
            <span class="radio-letter">A</span>
            <label htmlFor="radio1">Option 1</label>
            </div>
            <div
            className={`custom-radio ${selectedRadio === 'radio2' ? 'selected' : ''}`}
            onClick={() => handleDivClick('radio2')}
            >
            <input
                type="radio"
                id="radio2"
                name="radio-group"
                checked={selectedRadio === 'radio2'}
                onChange={handleRadioChange}
            />
            <span class="radio-letter">B</span>
            <label htmlFor="radio2">Option 2</label>
            </div>
            <div
            className={`custom-radio ${selectedRadio === 'radio3' ? 'selected' : ''}`}
            onClick={() => handleDivClick('radio3')}
            >
            <input
                type="radio"
                id="radio3"
                name="radio-group"
                checked={selectedRadio === 'radio3'}
                onChange={handleRadioChange}
            />
            <span class="radio-letter">C</span>
            <label htmlFor="radio3">Option 3</label>
            </div>
            <div
            className={`custom-radio ${selectedRadio === 'radio4' ? 'selected' : ''}`}
            onClick={() => handleDivClick('radio4')}
            >
            <input
                type="radio"
                id="radio4"
                name="radio-group"
                checked={selectedRadio === 'radio4'}
                onChange={handleRadioChange}
            />
            <span class="radio-letter">D</span>
            <label htmlFor="radio4">Option 4</label>
            </div>
        </div>
    </div>
  );
};

export default Content;
