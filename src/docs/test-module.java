package com.bskyb.uma.app.di.pin;

import android.content.Context;

import com.bskyb.bootstrap.uma.steps.location.territory.TerritoryRepository;
import com.bskyb.uma.app.R;
import com.bskyb.uma.app.buttons.action.PinLoginDialogPresenter;
import com.bskyb.uma.app.di.PerBootstrap;
import com.bskyb.uma.app.pin.PinChallengeGermany;
import com.bskyb.uma.app.pin.PinChallengeItaly;
import com.bskyb.uma.app.pin.PinChallengeUK;
import com.bskyb.uma.app.pin.PinPresenterFactory;
import com.bskyb.uma.app.pin.interfaces.PinChallenge;
import com.bskyb.uma.app.pin.processor.PinProcessor;
import com.bskyb.uma.app.sps.UmaSpsLibrary;
import com.bskyb.uma.utils.dates.UmaTime;

import dagger.Module;
import dagger.Provides;

@Module
@PerBootstrap
public class PinFactoryModule {

    @Provides
    @PerBootstrap
    protected Dependency1 providePinPresenterFactory(Context context,
                                                             PinChallenge pinChallenge,
                                                             UmaSpsLibrary spsLibrary,
                                                             UmaTime umaTime,
                                                             PinProcessor pinProcessor) {
        return new PinPresenterFactory(context, pinChallenge, spsLibrary, umaTime, pinProcessor);
    }

    @Provides
    @PerBootstrap
    protected Dependency2 providePinDialogPresenter(Context context) {
        return new PinLoginDialogPresenter(context.getString(R.string.pin_error_pin_not_set_up));
    }

    @Provides
    @PerBootstrap
    Dependency3 providePinDialogPresenter(Context context) {
        return new PinLoginDialogPresenter(context.getString(R.string.pin_error_pin_not_set_up));
    }

    @Provides
    @PerBootstrap
    protected Dependency4 provideAnotherThing() {
        return new PinLoginDialogPresenter(context.getString(R.string.pin_error_pin_not_set_up));
    }

    @Provides
    @PerBootstrap
    public Dependency5 providerPinChallenge(TerritoryRepository territoryRepository, UmaTime umaTime) {
        PinChallenge pinChallenge;
        switch (territoryRepository.get()) {
            case UNINITIALISED:
            case UK:
            case ROI:
                pinChallenge = new PinChallengeUK(umaTime);
                break;
            case GERMANY:
            case AUSTRIA:
                pinChallenge = new PinChallengeGermany(umaTime);
                break;
            case ITALY:
            case SANMARINO:
            case VATICAN_CITY:
                pinChallenge = new PinChallengeItaly();
                break;
            default:
                pinChallenge = new PinChallengeUK(umaTime);
                break;
        }

        return pinChallenge;
    }
}
