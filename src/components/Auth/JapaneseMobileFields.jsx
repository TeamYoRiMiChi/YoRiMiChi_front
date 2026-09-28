import { useRef } from 'react';
import '../../assets/styles/JapaneseMobileFields.css';

const MOBILE_PREFIXES = ['070', '080', '090'];

function JapaneseMobileFields({
  value,
  onChange,
  disabled = false,
  idPrefix = 'mobile-phone',
}) {
  const middleInputRef = useRef(null);
  const lastInputRef = useRef(null);
  const [prefix = '', middle = '', last = ''] = (value ?? '').split('-');

  const updateValue = (nextPrefix, nextMiddle, nextLast) => {
    onChange(`${nextPrefix}-${nextMiddle}-${nextLast}`);
  };

  const handlePrefixChange = (event) => {
    const nextPrefix = event.target.value;
    updateValue(nextPrefix, middle, last);

    if (nextPrefix) {
      middleInputRef.current?.focus();
    }
  };

  const handleMiddleChange = (event) => {
    const nextMiddle = digitsOnly(event.target.value);
    updateValue(prefix, nextMiddle, last);

    if (nextMiddle.length === 4) {
      lastInputRef.current?.focus();
    }
  };

  const handleLastChange = (event) => {
    updateValue(prefix, middle, digitsOnly(event.target.value));
  };

  return (
    <div className="japanese-mobile-fields" role="group" aria-label="携帯電話番号">
      <select
        id={`${idPrefix}-prefix`}
        value={MOBILE_PREFIXES.includes(prefix) ? prefix : ''}
        onChange={handlePrefixChange}
        disabled={disabled}
        aria-label="携帯電話番号の先頭3桁"
        required
      >
        <option value="">選択</option>
        {MOBILE_PREFIXES.map((mobilePrefix) => (
          <option value={mobilePrefix} key={mobilePrefix}>
            {mobilePrefix}
          </option>
        ))}
      </select>

      <span aria-hidden="true">-</span>

      <input
        ref={middleInputRef}
        id={`${idPrefix}-middle`}
        type="text"
        inputMode="numeric"
        autoComplete="tel-national"
        value={middle}
        onChange={handleMiddleChange}
        disabled={disabled}
        maxLength={4}
        pattern="[0-9]{4}"
        placeholder="1234"
        aria-label="携帯電話番号の中央4桁"
        required
      />

      <span aria-hidden="true">-</span>

      <input
        ref={lastInputRef}
        id={`${idPrefix}-last`}
        type="text"
        inputMode="numeric"
        autoComplete="tel-national"
        value={last}
        onChange={handleLastChange}
        disabled={disabled}
        maxLength={4}
        pattern="[0-9]{4}"
        placeholder="5678"
        aria-label="携帯電話番号の末尾4桁"
        required
      />
    </div>
  );
}

function digitsOnly(value) {
  return value.replace(/\D/g, '').slice(0, 4);
}

export default JapaneseMobileFields;
