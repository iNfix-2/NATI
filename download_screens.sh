#!/bin/bash
mkdir -p screens

echo "Downloading NATI | Training Programmes..."
curl -L -s "https://lh3.googleusercontent.com/aida/AP1WRLupnvooLsTerJ3wWQ1BHv99m53FbnxrgKPxe3obmrcr9kWzEPuyeLjsN_xS0yGObDpzATyf7p1CNVPo-iYWYZe3qEs-eLXQ5EdgCCuMOOuR9ZbgdT32nk0u_OYjtNckBfWOheqxn8FfAxaIQgjCcxSex3TES5xwlveAa8XILYk4J_11VugUcgJDo9XHUEabknRhnxDkbGdQUuLG5ySoi--695Gqeno7B9QB3BxH9JnqQNOBiG6hEOVB6Z8" -o screens/training-programmes.png
curl -L -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NWNkMzc5MDJjZmIwNGE0NTAwMTkxMGIyZjE4EgsSBxDOgcr__A8YAZIBIwoKcHJvamVjdF9pZBIVQhM1MzExNTk4NzUzMjE5NjA5MjUy&filename=&opi=89354086" -o screens/training-programmes.html

echo "Downloading NATI | Home..."
curl -L -s "https://lh3.googleusercontent.com/aida/AP1WRLsFLS4ih0x-HuZbcm2LPETi5weWwERay2RtzzInp-pR6VnJu-gCJUoXXi02xqQhGld8V9NU0PlBBaPERp86TDzruj4hmm0C3lzRSJKleoSq0UiIoQ1jAgjvcN0_dt8Up4d7OvHBOwBYPco0nHwJ-8q0FRKMm9ySybPWgW6gK7QdRziCFS46xA6klzmJewmQ4qmaudRDMlGGsnEFls1GiiPdM45EqRLpbM7Lzbp-iMsMRsXAmBJ84jWl23I" -o screens/home.png
curl -L -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NWNkM2E5NTQ4NDgwMjNiZGM2ZDhkMDVmY2YzEgsSBxDOgcr__A8YAZIBIwoKcHJvamVjdF9pZBIVQhM1MzExNTk4NzUzMjE5NjA5MjUy&filename=&opi=89354086" -o screens/home.html

echo "Downloading NATI | About Us..."
curl -L -s "https://lh3.googleusercontent.com/aida/AP1WRLvt3UC_5KB-xlnPzPYsPOFOa3XuobyDNw-k-GoVXLYRXw7l6_3KTlVOAXWIITL9Bczu597mfipzfBlyiSz_DTMXtHhxxYIbKC1UiE0tSFumnC2YonPNnQuhUa6izlMW4xG-3Q3zvJxJ8IyEqhmxwOwvdmHusXoPLn06EuY5Yu502sWgV6QqGrRItvV1Lnlw47JrvFA-Z0iskR_c-kjtJn-PvCWXdBnan10roFACXpHKGyrQbYr-ckRKig" -o screens/about-us.png
curl -L -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NWNkMzg0NzZlYTcwOTY4YWYxODU0MTQ0MjQ3EgsSBxDOgcr__A8YAZIBIwoKcHJvamVjdF9pZBIVQhM1MzExNTk4NzUzMjE5NjA5MjUy&filename=&opi=89354086" -o screens/about-us.html

echo "Downloading NATI | UAV Pilot Training Detail..."
curl -L -s "https://lh3.googleusercontent.com/aida/AP1WRLtDJTQSlr4gNs_U1EmJzuLauOt_PFmkgB0bU54ChHcEeXuC2kwTh9SK-vUvOaqfv4i5WYgTt9Z2fqJiMAmiGIFzlB7ZPhbCIXBZe7sUNZw_yqzcvLXJnHJJ2hDDvPRyfaLVihyqAubQScky7XF7m7X_NTQ5QLEbXVuzmu6SkR49xGJfVob2Ta16-bgVe5C8gNmfR6EzeJee-a4j4E2haHZPjHJerMW90gZFKdsCJLlCmj8N07rOSCRmhFo" -o screens/uav-pilot-training-detail.png
curl -L -s "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NWNkMzhjNGIzZTIwMzU2ZWZhZjZhMTkxZWFmEgsSBxDOgcr__A8YAZIBIwoKcHJvamVjdF9pZBIVQhM1MzExNTk4NzUzMjE5NjA5MjUy&filename=&opi=89354086" -o screens/uav-pilot-training-detail.html

echo "Done."
