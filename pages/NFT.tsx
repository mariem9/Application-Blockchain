import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Header3 from "../components/Header3"
import {
  MediaRenderer,
  useActiveListings,
  useMarketplace,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const NFT: NextPage = () => {
  const router = useRouter();


  const marketplace = useMarketplace(
    "0x2a3014263683430Bd748D92EAd6A1ad0aec9Ed04" 
  );

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  return (
     <div>
       
     <Header3/>
     
     <div className={styles.container}>
        <div style={{ marginTop: 150, marginBottom: 50 }}>
        <h1 className={styles.h2}>NFT Marketplace </h1>
        <p className={styles.explain}>
        Découvrir les collections les plus haut de gamme, uniques et exclusives de NFT
           
        </p>
        </div>

        <div className="main">
          {
             loadingListings ? (
              <div>Loading listings...</div>
            ) : (
              <div className={styles.listingGrid}>
                {listings?.map((listing) => (
                  <div
                    key={listing.id}
                    className={styles.listingShortView}
                    onClick={() => router.push(`/listing/${listing.id}`)}
                  >
                    <MediaRenderer
                      src={listing.asset.image}
                      style={{
                        borderRadius: 16,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <h2 className={styles.nameContainer}>
                      <Link href={`/listing/${listing.id}`}>
                        <a className={styles.name}>{listing.asset.name}</a>
                      </Link>
                    </h2>

                    <p>
                      <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                      {listing.buyoutCurrencyValuePerToken.symbol}
                    </p>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default NFT;
