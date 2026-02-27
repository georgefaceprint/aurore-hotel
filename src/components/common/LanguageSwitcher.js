
'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    const changeLanguage = (e) => {
        const locale = e.target.value;
        const path = pathname.split('/').slice(2).join('/');
        router.push(`/${locale}/${path}`);
    };

    return (
        <select
            onChange={changeLanguage}
            defaultValue={pathname.split('/')[1]}
            style={{
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                marginRight: '12px',
                cursor: 'pointer'
            }}
        >
            <option value="en">English</option>
            <option value="bem">Bemba</option>
            <option value="nya">Nyanja</option>
        </select>
    );
}
